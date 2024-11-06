export function formatCurrencyBRL(value: number): string {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function removeBRLCurrencyFormatting(value: string): number {
    return Number(value.trim().replace('.', '').replace(',', '.').replace('R$', ''));
}
