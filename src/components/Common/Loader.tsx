import { observer } from "mobx-react-lite";
import { Modal, Spinner } from "react-bootstrap";

import { useStore } from "../../hooks/use-store.hooks";

export const Loader = observer(() => {
  const {
    loaderStore: { show, setShowLoader },
  } = useStore();
  return (
    <Modal
      centered
      size="lg"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      onHide={() => setShowLoader(false)}
      keyboard={false}
      backdrop="static"
      dialogClassName="modal-loader"
    >
      <Modal.Body className="py-1 px-5 text-center justify-content-center mt-5 mb-5 flex-column">
        <Spinner animation="grow" />
      </Modal.Body>
    </Modal>
  );
});
