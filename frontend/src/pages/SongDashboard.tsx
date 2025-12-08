import { Layout, List, Button, Input, Select, Row, Col } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import PageHeader from "../components/Navbar/PageHeader";
import SongCard from "../components/SongCard";
import CreateSongModal, { type onSubmitCreateSongProps } from "../components/CreateSongModal";
import UpdateSongModal from "../components/UpdateSongModal";
import { useCreateSong, useDeleteSong, useUpdateSong, useSongs } from "../hooks/useSongs";
import { useTags } from "../hooks/useTags";
import { useSongEditStore } from "../stores/songEditStore";
import type { UpdateSongData, Song } from "../types/api";

function SongDashboard() {
  const { data: songsData, isLoading, isError } = useSongs();
  const { data: tagsData } = useTags();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

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

  const filteredSongs = useMemo(() => {
    if (!songsData) return [];

    return songsData.filter(song => {
      const matchesSearch = searchTerm === '' ||
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.description && song.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        (song.tags && song.tags.some(tag => selectedTags.includes(tag.id)));

      return matchesSearch && matchesTags;
    });
  }, [songsData, searchTerm, selectedTags]);

  const tagOptions = useMemo(() => {
    return tagsData?.map(tag => ({
      label: tag.label,
      value: tag.id,
    })) || [];
  }, [tagsData]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Songs Dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
        <Row gutter={16} style={{ marginBottom: '24px' }} align="middle">
          <Col flex="auto">
            <Row gutter={12}>
              <Col xs={24} sm={16} md={12}>
                <Input
                  placeholder="Search songs by name or description..."
                  prefix={<SearchOutlined />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={8} md={6}>
                <Select
                  mode="multiple"
                  placeholder="Filter by tags"
                  value={selectedTags}
                  onChange={setSelectedTags}
                  options={tagOptions}
                  style={{ width: '100%' }}
                  allowClear
                  maxTagCount={2}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsCreateModalOpen(true)}
              size="large"
            >
              Create Song
            </Button>
          </Col>
        </Row>
        {isLoading && <p>Loading songs...</p>}
        {isError && <p>Error loading songs.</p>}
        <List
          itemLayout="horizontal"
          dataSource={filteredSongs}
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
