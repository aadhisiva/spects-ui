import { Modal, Result } from "antd";
import { useState } from "react";


export const ShowInfoPageForOnline = ({ open }: any) => {

    const [isModalOpen, setIsModalOpen] = useState(!open);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return <Modal title="Network Error" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Result
            status="warning"
            title={<h4>There are some problems with your Network.</h4>}
        />
    </Modal>
};