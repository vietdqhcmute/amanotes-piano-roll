import { Layout, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/Navbar/PageHeader";
import SongCard from "../components/SongCard";
import CreateSongModal from "../components/CreateSongModal";
import { ElectroSong, rockSong } from "../mocks/songs";

function SongDashboard() {
  const mockSongs = [rockSong, ElectroSong];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSong = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = (values: any) => {
    console.log('New song:', values);
    setIsModalOpen(false);
    // TODO: Add song creation logic here
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Songs Dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateSong}
            size="large"
          >
            Create Song
          </Button>
        </div>

        <List
          itemLayout="horizontal"
          dataSource={mockSongs}
          split={false}
          renderItem={(song, index) => (
            <SongCard
              key={index}
              id={song.id}
              name={song.name}
              description={song.description}
              totalDuration={song.totalDuration}
            />
          )}
        />

        <CreateSongModal
          open={isModalOpen}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
        />
      </Layout.Content>
    </Layout>
  );
}

export default SongDashboard;
