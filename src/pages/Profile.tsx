import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import Sidebar from "../components/SideBar";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import ApiError from "../components/ApiError";

interface User {
  username: string,
  email: string,
  avatar: string
}

const Profile = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [profile, setProfile] = useState<User | null>(null)
  const [error, setError] = useState('')
  const [loader, setLoader] = useState(false)

  const token = localStorage.getItem('TOKEN')
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("You are not login")
        return navigate('/login')
      }

      try {
        setLoader(true)

        const res = await axios.get(`${api}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setProfile(res.data)
        setFormData({
          username: res.data.username,
          email: res.data.email
        })
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch profile")
        setError("Api Fetching Error")
      } finally {
        setLoader(false)

      }
    }
    fetchProfile()
  }, [token, navigate])

  const handleEditProfile = async () => {
    if (!token) {
      toast.error("You are not login")
      return navigate('/login')
    }
    try {
      const res = await axios.put(`${api}/api/user/editProfile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setProfile(res.data)
      setEditDialogOpen(false)
      toast.success("Profile updated")

    } catch (error) {
      console.log(error);
      toast.error("Error updating profile")
      setError("Api Fetching Error")

    }
  }

  if (error) return <ApiError error={error} />
  if (loader) return <Loading />

  return (
    <div className="dashboard_container">
      <Sidebar />

      <main>
        <motion.div
          className="profile_container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="profile_left"
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <motion.img
              src={profile?.avatar}
              alt="User Avatar"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          <motion.div
            className="profile_right"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1>{profile?.username}</h1>
            <p className="email">{profile?.email}</p>
            <span className="role">Creator</span>

            <motion.div whileHover={{ scale: 1.08 }} className="edit_btn">
              <Button onClick={() => setEditDialogOpen(true)} startIcon={<Edit />}>
                Edit Profile
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

      </main>

      <Dialog
        open={editDialogOpen} onClose={() => setEditDialogOpen(false)}
        fullScreen={isMobile} fullWidth maxWidth="sm"
      >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditProfile}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Profile;
