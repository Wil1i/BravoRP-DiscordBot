let client = require("../../index").client;


const get = async (req, res) => {
  if(!client) client = require("../../index").client

  const user = client.users.cache.find((u) => u.username === req.params.username);

  if (!user) return res.json({ error: `User '${req.params.username}' not found.` });

  try {
    const member = await user.fetch();
    const status = member.presence?.status || 'offline';
    res.json({ username: user.username, status, proficon: user.displayAvatarURL({ dynamic: true }) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user information.' });
  }
}

module.exports = {
  get
}