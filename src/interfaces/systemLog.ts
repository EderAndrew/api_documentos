export interface SystemLog{
    id?: string
    level: string
    operator: string
    operator_register: string
    ip: string
    message: string
    created_at?: Date
}