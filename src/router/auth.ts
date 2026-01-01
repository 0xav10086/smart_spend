import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

// --- 注册接口 (用于初始化你的账号) ---
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) return res.status(400).json({ message: '用户已存在' });

    // 2. 加密密码 (加盐 10 次)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 存入数据库
    const user = await prisma.user.create({
      data: { username, password: hashedPassword }
    });

    res.status(201).json({ message: '注册成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// --- 登录接口 ---
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. 查找用户
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ message: '用户不存在' });

    // 2. 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: '密码错误' });

    // 3. 生成 JWT Token
    // 载荷中存入用户 ID，设置 24 小时过期
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    // 4. 返回 Token 和用户信息
    res.json({
      message: '登录成功',
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});