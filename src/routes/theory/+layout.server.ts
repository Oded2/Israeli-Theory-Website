import { addParams, shuffleArray } from "../../hooks.client";

export async function load({ url }) {
    const params = url.searchParams;
    const lang: string = params.get("lang") ?? "en";
    const len: string = params.get("len") ?? "30";
    const questions = shuffleArray(await fetchQuestions(lang), +len);
    return { questions, lang }
}


async function fetchQuestions(lang: string) {
    const languageResourceId: any = {
        en: "9a197011-adf9-45a2-81b9-d17dabdf990b",
        he: "bf7cb748-f220-474b-a4d5-2d59f93db28d",
        ar: "fe998a65-83a3-45e5-b4b7-3e0ce86ae072",
        fr: "a106ea08-ff97-4971-8720-c85bdd3d2264",
        ru: "ca264280-1669-45ce-a96f-a4c9ed71e812",
    };
    const resourceId: string = languageResourceId[lang];
    const url: URL = new URL("https://data.gov.il/api/3/action/datastore_search");
    addParams(url, {
        resource_id: resourceId,
        limit: 5000,
    });
    const data = await fetch(url).then((response) => response.json());
    const questions = parseQuestions(data);
    return questions;
    function parseQuestions(data: { result: { records: any[] } }) {
        return data.result.records.map(
            (record: { title2: string, description4: string, category: string }) => {
                const htmlContent = record.description4;

                // Matches both the normal answers and the correct answer.
                // It then removes HTML tags and trims whitespace from each answer.
                const answersMatch = htmlContent.match(
                    /<li><span>(.*?)<\/span><\/li>|<span id=\"correctAnswer\d+\">(.*?)<\/span>/g
                );
                const answers = answersMatch
                    ? answersMatch.map((answer: string) =>
                        answer.replace(/<\/?[^>]+(>|$)/g, "").trim()
                    )
                    : [];

                // Matches the correct answer and extracts it, or null if no match was found.
                const correctAnswerMatch = htmlContent.match(
                    /<span id=\"correctAnswer\d+\">(.*?)<\/span>/
                );
                const correctAnswer = correctAnswerMatch ? correctAnswerMatch[1] : "";

                // Matches the image URL and extracts it, or null if no match was found.
                const imageUrlMatch = htmlContent.match(/<img src=\"(.*?)\"/);
                const imageUrl = imageUrlMatch ? imageUrlMatch[1] : "";

                // Extracts the question number from the title.
                const questionNumber: string = record.title2.split(".")[0];

                return {
                    questionNumber: questionNumber,
                    question: record.title2.split(". ")[1], // Excludes the part before the dot
                    answers: answers,
                    correctAnswer: correctAnswer,
                    category: record.category,
                    imageUrl: imageUrl, // Adds the image URL to the result object
                };
            }
        )
    }
}