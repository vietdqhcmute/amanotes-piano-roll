import { Layout, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/Navbar/PageHeader";
import SongCard from "../components/SongCard";
import CreateSongModal from "../components/CreateSongModal";
import { useCreateSong, useSongs } from "../hooks/useSongs";
import type { Song } from "../types/api";

function SongDashboard() {
  const { data: songsData, isLoading, isError } = useSongs();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: createSongHandler, onSuccess: onCreateSongSuccess } = useCreateSong();

  const handleModalOk = (values: any) => {
    setIsModalOpen(false);
    createSongHandler(values);
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
            onClick={() => setIsModalOpen(true)}
            size="large"
          >
            Create Song
          </Button>
        </div>
        {isLoading && <p>Loading songs...</p>}
        {isError && <p>Error loading songs.</p>}
        <List
          itemLayout="horizontal"
          dataSource={songsData}
          split={false}
          renderItem={(song: Song, index) => (
            <SongCard
              key={index}
              id={song.id}
              name={song.name}
              description={song.description || ''}
              totalDuration={song.duration}
              tags={song.tags}
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
