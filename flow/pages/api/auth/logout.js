export default async function handler(req, res) {
    res.setHeader('Set-Cookie', 'token=; Max-Age=0; path=/');
    res.status(200).json({ message: 'Usuário deslogado' });
}
