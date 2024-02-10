import EntryDialog from "../entry-dialog";

const Footer = (data: {
  footer: {
    left_copy: string;
    right_copy: string;
  };
}) => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-6 py-2 rounded-b-xl rounded-t-sm">
      <div className="text-xs">{data.footer.left_copy}</div>
      <EntryDialog />
      <div className="text-xs">{data.footer.right_copy}</div>
    </div>
  );
};

export default Footer;
