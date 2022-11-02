import type { Telegram } from "./types";

declare global {
    interface Window {
        Telegram: Telegram
    }
}

// window.MyNamespace = window.MyNamespace || {};