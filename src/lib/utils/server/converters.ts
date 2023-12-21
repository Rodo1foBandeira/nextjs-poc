'use server'
export const stringToMoney = async (v: string) => `R$ ${v.replaceAll('.', ',')}`