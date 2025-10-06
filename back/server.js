import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from "dotenv"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;


const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(express.json());
app.use(cors(corsOptions));

const prismaClient = new PrismaClient({
    datasources: {
        db: {
            url: DATABASE_URL,
        },
    },
});


app.get('/api/data', async (req, res) => {
    const searchTerm = req.query.search || ''
    const data = await prismaClient.tableName.findMany(

        {
            where: {
                OR: [
                    {
                        INSCL: {
                            contains: searchTerm.toLowerCase(),
                        }
                    },
                    {
                        SUBINSCL: {
                            contains: searchTerm.toLowerCase(),
                        }
                    },
                    {
                        Rights_Name: {
                            contains: searchTerm.toLowerCase(),
                        }
                    },
                    {
                        HOSxP_Rights: {
                            contains: searchTerm.toLowerCase(),
                        }
                    }
                ]
            }
        }
    );

    res.json(data);
});

app.post('/api/data', async (req, res) => {

    const { INSCL, SUBINSCL, Rights_Name, HOSxP_Rights, PTTYPE } = req.body;

    try {
        const newData = await prismaClient.tableName.create({
            data: {
                INSCL,
                SUBINSCL,
                Rights_Name,
                HOSxP_Rights,
                PTTYPE,
            },
        });
        res.status(201).json(newData); // ส่งข้อมูลที่เพิ่มไป
    } catch (error) {
        console.error('Error adding data:', error);
        res.status(500).send('Error adding data');
    }
})

app.put('/api/data/:id', async (req, res) => {
  const { id } = req.params;
  const { INSCL, SUBINSCL, Rights_Name, HOSxP_Rights, PTTYPE } = req.body;

  try {
    const updatedData = await prismaClient.tableName.update({
      where: { id: parseInt(id) },
      data: {
        INSCL,
        SUBINSCL,
        Rights_Name,
        HOSxP_Rights,
        PTTYPE,
      },
    });
    res.json(updatedData); // ส่งข้อมูลที่อัพเดตแล้ว
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
