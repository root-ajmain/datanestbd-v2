import { Composition } from 'remotion';
import { FPS } from './brand';
import { WhyChooseUs } from './compositions/WhyChooseUs';
import { serviceHighlights } from './data/serviceHighlights';

const DURATION_IN_FRAMES = 240; // 8s at 30fps
const WIDTH = 1200;
const HEIGHT = 900; // matches the 4:3 panel the service page slots it into

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {serviceHighlights.map((service) => (
        <Composition
          key={service.id}
          id={`WhyChooseUs-${service.id}`}
          component={WhyChooseUs}
          durationInFrames={DURATION_IN_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
          defaultProps={{ title: service.title, points: service.points }}
        />
      ))}
    </>
  );
};
