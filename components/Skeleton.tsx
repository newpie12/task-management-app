import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { Dimensions, View } from 'react-native';
const screenWidth = Dimensions.get('screen').width;

const Skeleton = () => (
  <ContentLoader
    width={screenWidth}
    speed={2}
    backgroundColor="#E8E8E8"
    foregroundColor="#F7F7F7"
  >
    <Rect x="20" y="10" rx="3" ry="3" width="130" height="20" />
    <Rect x="20" y="46" rx="10" ry="10" width="390" height="90" />
    <Rect x="20" y="144" rx="10" ry="10" width="390" height="90" />
  </ContentLoader>
);

export default Skeleton;
