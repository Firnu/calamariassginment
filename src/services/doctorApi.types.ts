export type Doctor = {
    id: number,
    avatarSrc?: string | null,
    name: string,
    lastName: string,
    specialization: string,
    userRating: number | null,
    ratingCount: number,
    ratingSum: number,
    isFavorite: boolean,
}