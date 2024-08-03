import axios from "axios"
import { HOST } from "../utils/constants"

export const apiCliet=axios.create({
    baseURL:HOST
})