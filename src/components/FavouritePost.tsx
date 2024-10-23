import { Avatar, Divider, Modal, Typography } from "antd";
import { Color, LikeData } from "constants";

interface FavouritePostProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  likes: Array<LikeData>;
}

export const FavouritePost: React.FC<FavouritePostProps> = ({
  isModalOpen,
  setIsModalOpen,
  likes,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={() => null}
    >
      <Typography.Title level={4} style={{ color: Color.SECONDARY }}>
        Favourite on the post
      </Typography.Title>
      <Divider style={{ margin: "15px 0", borderBlockColor: "#000" }} />

      {likes.map((like) => (
        <div key={like.id} style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            alt="avatar"
            shape="circle"
            size="large"
            src={like.profilePictureUrl}
            style={{ marginRight: "15px" }}
          />
          <Typography.Text style={{ color: "gray" }}>
            {like.firstName} {like.lastName}
          </Typography.Text>
        </div>
      ))}
    </Modal>
  );
};
