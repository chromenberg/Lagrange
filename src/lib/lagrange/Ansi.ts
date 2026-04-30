export enum AnsiCodeStyle {
    Normal,
    Bold,
    Faint,
    Italic,
    Underline,
    Blink,
    Inverse,
    Hidden,
    Strikethrough
}
interface AnsiCodeOptions {
    style: number[]
    color?: number[]
    background?: number[]
}

export function AnsiCode(options: AnsiCodeOptions): string {
    const bg = (options.background) ? options.background.join(";") : "49";
    const fg = (options.color) ? options.color.join(";") : "39";
    const code = "\\x1b["+
        options.style.join(";")+";"+
        fg+";"+
        bg+"m"
    
    return code;
}
export function AnsiText(color: string, text: string): string {
    return color+text+"\x1b[0;39;49m";
}
