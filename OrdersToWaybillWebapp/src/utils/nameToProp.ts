import { PropToName } from "@/types";

export function nameToProp (name: typeof PropToName[keyof typeof PropToName]) {
    return Object.keys(PropToName).map((k) => (PropToName[k as keyof typeof PropToName] === name) ? k : false).find((k) => k !== false)
}