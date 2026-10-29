import type {ToolId} from '../catalog';
import Timer from '../modules/Timer';
import Sequence from '../modules/Sequence';
import Groups from '../modules/Groups';
import Autonomy from '../modules/Autonomy';
import Observation from '../modules/Observation';
import Syllables from '../modules/Syllables';
import Words from '../modules/Words';
import Guidelines from '../modules/Guidelines';
const components={timer:Timer,sequence:Sequence,groups:Groups,autonomy:Autonomy,observation:Observation,syllables:Syllables,words:Words,guidelines:Guidelines};
export default function ToolContent({id}:{id:ToolId}){const Component=components[id];return <Component/>;}
