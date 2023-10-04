import { useParams } from 'react-router-dom';

const List = () => {
  const { id } = useParams();

  return <h1>List {id}</h1>;
};

export default List;
