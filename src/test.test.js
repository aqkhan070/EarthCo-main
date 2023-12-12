
import EventPopups from "../Reusable/EventPopups";

const [openSnackBar, setOpenSnackBar] = useState(false);
const [snackBarColor, setSnackBarColor] = useState("");
const [snackBarText, setSnackBarText] = useState("");

setOpenSnackBar(true);
setSnackBarColor("success");
setSnackBarText(response.data.Message);

<EventPopups
open={openSnackBar}
setOpen={setOpenSnackBar}
color={snackBarColor}
text={snackBarText}
/>