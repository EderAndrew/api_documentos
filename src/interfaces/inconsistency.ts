export interface Inconsistency{
    id?: number
    operator_name: string
    operator_register: string
    requestor_name: string
    requestor_register: string
    bank_op: string
    information_date: string
    correction_date?: string
    description?: string
    status: string
    solicitationId: number
}