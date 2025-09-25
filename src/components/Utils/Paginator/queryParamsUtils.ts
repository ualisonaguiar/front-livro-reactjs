export function buildQueryParams(
    page: number,
    filtros: Record<string, any> = {}
): string {
    const params = new URLSearchParams({
        page: page.toString(),
        ...Object.fromEntries(
            Object.entries(filtros).filter(([_, v]) => v !== undefined && v !== "")
        ),
    });

    return params.toString();
}
