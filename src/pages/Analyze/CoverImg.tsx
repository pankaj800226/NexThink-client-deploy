import { Delete, Edit, Upload } from "@mui/icons-material";
import { Button } from "@mui/material";
import coverImg from "../../assets/cover.jpg";

const CoverImg = () => {

    return (
        <div className="cover-wrapper">
            <img src={coverImg} alt="cover" className="cover-img" />

            <div className="cover-actions">
                <Button className="cover-btn edit" component="label">
                    <Upload fontSize="small" />
                    Change cover
                    <input hidden type="file" accept="image/*" />
                </Button>

                <Button className="cover-btn edit">
                    <Edit fontSize="small" />
                    Edit
                </Button>

                <Button className="cover-btn delete" >
                    <Delete fontSize="small" />
                    Remove
                </Button>
            </div>
        </div>
    );
};

export default CoverImg;
