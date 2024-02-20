import Modal from "react-modal"
import "./_modal.css"

interface Props {
    isOpen: boolean,
    children: React.ReactNode

}
export default ({ isOpen, children }: Props) => (
    <Modal

        isOpen={isOpen}
        contentLabel="Modal"
        className={{
            base: "modal-base",
            afterOpen: "modal-base_after-open",
            beforeClose: "modal-base_before-close"
        }}
        overlayClassName={{
            base: "overlay-base",
            afterOpen: "overlay-base_after-open",
            beforeClose: "overlay-base_before-close"
        }}
        shouldCloseOnOverlayClick={false}
        closeTimeoutMS={2000}
    >
        {children}

        <br />


    </Modal>
)
