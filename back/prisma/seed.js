import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.tableName.createMany({
        data: [
            {
                INSCL: "UCS",
                SUBINSCL: "-",
                hmain: 10610,
                hsub: "",
                Rights_Name: "สิทธิบัตรทอง(30 บาท)",
                PTTYPE: 89,
                HOSxP_Rights: "บัตรทอง",
            },
            {
                INSCL: "UCS",
                SUBINSCL: "",
                hmain: 0,
                hsub: "",
                Rights_Name: "",
                PTTYPE: 0,
                HOSxP_Rights: "",
            },
            {
                INSCL: "WEL",
                SUBINSCL: "71",
                hmain: 0,
                hsub: "",
                Rights_Name: "เด็ก ? 12 ปี",
                PTTYPE: 71,
                HOSxP_Rights: "เด็กบัตรทอง",
            },
            {
                INSCL: "WEL",
                SUBINSCL: "72",
                hmain: 0,
                hsub: "",
                Rights_Name: "ผู้รายได้น้อย",
                PTTYPE: 72,
                HOSxP_Rights: "ผู้รายได้น้อย",
            },
            {
                INSCL: "OFC",
                SUBINSCL: "O1",
                hmain: 0,
                hsub: "",
                Rights_Name: "ข้าราชการ",
                PTTYPE: 23,
                HOSxP_Rights: "ข้าราชการ",
            },
            {
                INSCL: "OFC",
                SUBINSCL: "O2",
                hmain: 0,
                hsub: "",
                Rights_Name: "ลูกจ้างประจำ",
                PTTYPE:23,
                HOSxP_Rights: "ข้าราชการ",
            },
            {
                INSCL: "OFC",
                SUBINSCL: "O3",
                hmain: 0,
                hsub: "",
                Rights_Name: "ผู้รับบำนาญ",
                PTTYPE: 23,
                HOSxP_Rights: "ข้าราชการ",
            },
            {
                INSCL: "OFC",
                SUBINSCL: "O4",
                hmain: 0,
                hsub: "",
                Rights_Name: "ครอบครัวข้าราชการ",
                PTTYPE: 23,
                HOSxP_Rights: "ข้าราชการ",
            },
            {
                INSCL: "OFC",
                SUBINSCL: "O5",
                hmain: 0,
                hsub: "",
                Rights_Name: "ครอบครัวผู้รับบำนาญ",
                PTTYPE: 23,
                HOSxP_Rights: "ข้าราชการ",
            },
            {
                INSCL: "SSS",
                SUBINSCL: "-",
                hmain: 0,
                hsub: "",
                Rights_Name: "ประกันสังคม",
                PTTYPE: 21,
                HOSxP_Rights: "ประกันสังคม",
            },
            {
                INSCL: "SSI",
                SUBINSCL: "-",
                hmain: 0,
                hsub: "",
                Rights_Name: "ประกันสังคมกรณีทุพพลภาพ",
                PTTYPE: 22,
                HOSxP_Rights: "ประกันสังคมทุพพลภาพ",
            },
            {
                INSCL: "LGO",
                SUBINSCL: "-",
                hmain: 0,
                hsub: "",
                Rights_Name: "สิทธิองค์กรปกครองส่วนท้องถิ่น",
                PTTYPE: 31,
                HOSxP_Rights: "สิทธิ์ อปท.",
            },
            {
                INSCL: "NHS",
                SUBINSCL: "-",
                hmain: 0,
                hsub: "",
                Rights_Name: "สิทธิ์เจ้าหน้าที่ สปสช.",
                PTTYPE: 41,
                HOSxP_Rights: "*",
            }
        ]
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
