export default interface IDatagridAcions<T> {
  view?: boolean;
  viewHref?: ({ pathname, row }: { pathname: string; row: T }) => string;
  edit?: boolean;
  editHref?: ({ pathname, row }: { pathname: string; row: T }) => string;
  delete?: boolean;
  deleteHref?: ({ pathname, row }: { pathname: string; row: T }) => string;
}
