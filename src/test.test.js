import { DataContext } from "../../context/AppData";

const { loggedInUser } = useContext(DataContext);

CompanyId : Number(loggedInUser.CompanyId),