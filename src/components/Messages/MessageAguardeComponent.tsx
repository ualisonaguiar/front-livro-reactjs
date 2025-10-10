import React from "react";

interface MessageAguardeProps {
  show: boolean;
  message?: string;
}

const MessageAguardeComponent: React.FC<MessageAguardeProps> = ({
  show,
  message = "Aguarde...",
}) => {
  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center p-4">
          <div className="spinner-border text-primary mb-3" role="status"></div>
          <p className="mb-0">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageAguardeComponent;
