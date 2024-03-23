import { hrefs } from "$lib";
import { redirect } from "@sveltejs/kit";

export function load() {
    throw redirect(301, hrefs.home);
}