// backend/src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
    id: number;
    email: string;
    planId: number;
    sessionId: string;
}