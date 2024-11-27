export function Code({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>
}
