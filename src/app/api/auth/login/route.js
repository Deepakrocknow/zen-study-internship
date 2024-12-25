import User from '@/database/models/User';
import bcrypt from 'bcrypt';

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }
    
    // Create a JWT token
    // const token = jwt.sign({ id: user._id, roles: user.roles }, SECRET, { expiresIn: '1h' });
    const token = 1234567890;

    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}