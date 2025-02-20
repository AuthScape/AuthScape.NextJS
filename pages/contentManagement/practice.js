import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";
 
const config = {
  components: {
    HeadingBlock: {
      fields: {
        children: {
          type: "text",
        },
      },
      render: ({ children }) => {
        return <h1>{children}</h1>;
      },
    },
  },
};
 
const initialData = {};
 
const save = (data) => {};

const Index = () => {
  return <Puck config={config} data={initialData} onPublish={save} />;
};

export default Index;
