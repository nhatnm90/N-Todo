const authMe = async (req, res) => {
  try {
    const { user } = req

    return res.status(200).json({ user })
  } catch (error) {
    console.log('Error when creating user: ', error)
    res.status(500).json({ message: 'Intenal server error: ', error })
  }
}

export { authMe }
