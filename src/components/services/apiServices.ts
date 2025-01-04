import { toast } from "react-toastify";
import axiosInstance from "../../axiosInstance";

export const PostRequestWithdownloadFile = async (url: string, body: any, fileName: string) => {
    try {
        const response = await axiosInstance.post(url, body, {
            responseType: 'blob',
        });

        // Create a URL for the blob
        const urlOfFile = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = urlOfFile;
        link.setAttribute('download', `${fileName}.xlsx`);

        // Append to the body and trigger click
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
    } catch (error) {
        toast.error("Error downloading the file");
        console.error('Error downloading the file', error);
    }
};

export const postRequest = async (url: string, body: any, loadAction: any) => {
    try {
        loadAction(true);
        const response = await axiosInstance.post(url, body);
        if (response.data.code == 200) {
            loadAction(false);
            return response.data;
        } else {
            toast.info(response.data.message);
            loadAction(false);
        }
    } catch (error: any) {
        loadAction(false);
        toast.error(error.message);
    }
};
