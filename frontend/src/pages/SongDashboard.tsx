import { Layout, List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import PageHeader from "../components/Navbar/PageHeader";
import SongCard from "../components/SongCard";
import CreateSongModal, { type onSubmitCreateSongProps } from "../components/CreateSongModal";
import UpdateSongModal from "../components/UpdateSongModal";
import { useCreateSong, useDeleteSong, useUpdateSong, useSongs } from "../hooks/useSongs";
import { useSongEditStore } from "../stores/songEditStore";
import type { UpdateSongData, Song } from "../types/api";

function SongDashboard() {
  const { data: songsData, isLoading, isError } = useSongs();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Zustand here just to show up my knowledge of State Management libraries, for this simple case useState would be enough
  const { selectedSong, openUpdateModal, closeUpdateModal } = useSongEditStore();
  const { mutate: createSongHandler } = useCreateSong();
  const { mutate: updateSongHandler } = useUpdateSong();
  const { mutate: deleteSongHandler } = useDeleteSong();

  const handleCreateModalOk = (values: onSubmitCreateSongProps) => {
    setIsCreateModalOpen(false);
    createSongHandler(values);
  };

  const handleCreateModalCancel = () => {
    setIsCreateModalOpen(false);
  };

  const handleUpdateModalOk = (values: UpdateSongData) => {
    if (selectedSong) {
      updateSongHandler({ id: selectedSong.id.toString(), data: values });
      closeUpdateModal();
    }
  };

  const handleUpdateModalCancel = () => {
    closeUpdateModal();
  };

  const handleEditSong = (id: string | number) => {
    const song = songsData?.find(s => s.id === id);
    if (song) {
      openUpdateModal(song);
    }
  };

  const handleDeleteSong = (id: string | number) => {
    deleteSongHandler(id.toString());
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Songs Dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModalOpen(true)}
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
              onDelete={() => handleDeleteSong(song.id)}
              onEdit={() => handleEditSong(song.id)}
            />
          )}
        />

        <CreateSongModal
          open={isCreateModalOpen}
          onOk={handleCreateModalOk}
          onCancel={handleCreateModalCancel}
        />

        <UpdateSongModal
          onOk={handleUpdateModalOk}
          onCancel={handleUpdateModalCancel}
        />
      </Layout.Content>
    </Layout>
  );
}

export default SongDashboard;
