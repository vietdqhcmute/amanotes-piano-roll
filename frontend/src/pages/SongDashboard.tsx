import { Layout, List } from "antd";
import PageHeader from "../components/Navbar/PageHeader";
import SongCard from "../components/SongCard";
import { ElectroSong, rockSong } from "../mocks/songs";

function SongDashboard() {
  const mockSongs = [rockSong, ElectroSong]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <PageHeader title="Songs Dashboard" />
      <Layout.Content style={{ padding: '24px' }}>
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
      </Layout.Content>
    </Layout>
  );
}

export default SongDashboard;
