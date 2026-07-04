export default function InputBoxAccessories({
  children,
}: {
  children?: React.ReactNode;
  }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore - Length does exist, as array is always covered.
  const needFlex = children?.length > 1 ? "flexHoriz " : "";
  return (
    <div className="inputBoxAccessories">
      <div className={needFlex+"accessoryStickyWrapper"}>{children}</div>
    </div>
  );
}
