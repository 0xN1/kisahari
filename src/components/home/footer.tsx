import EntryDialog from "@/components/home/entry-dialog";

const Footer = (data: {
  footer: {
    left_copy: string;
    right_copy: string;
  };
}) => {
  return (
    <div className="flex flex-row justify-between w-full items-center ring-1 ring-zinc-700 px-2 sm:px-4 md:px-6 py-2 rounded-b-xl rounded-t-sm">
      <div className="text-[10px] hidden sm:block sm:text-xs">
        {data.footer.left_copy}
      </div>
      <EntryDialog />
      <div className="text-[10px] sm:text-xs">
        {data.footer.right_copy} <span>{new Date().getFullYear()}</span>
      </div>
    </div>
  );
};

export default Footer;
