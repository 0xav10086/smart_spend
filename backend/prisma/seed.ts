import { PrismaClient } from '@prisma/client'
import { COLOR_PALETTE } from '../src/constants'

const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: '餐饮', type: 'EXPENSE', icon: 'Food', color: COLOR_PALETTE.DANGER },
        { name: '购物', type: 'EXPENSE', icon: 'Shopping', color: COLOR_PALETTE.WARNING },
        { name: '工资', type: 'INCOME', icon: 'Money', color: COLOR_PALETTE.SUCCESS },
        { name: '交通', type: 'EXPENSE', icon: 'Van', color: COLOR_PALETTE.PRIMARY },
    ]

    for (const c of categories) {
        await prisma.category.create({ data: c })
    }
}

main().catch(console.error)