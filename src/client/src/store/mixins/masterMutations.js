export function putItems(state, items) {
  state.items = items
}

export function setItem(state, item, prepend = false) {
  if (!state.items) {
    state.items = []
  }

  if (state.items.length === 0) {
    state.items.push(item)
    return
  }

  const index = state.items.findIndex(
    (temp) => Number(temp.id) === Number(item.id)
  )

  if (index === -1) {
    if (prepend) {
      state.items.splice(0, 0, item)
    } else {
      state.items.push(item)
    }

    return
  }

  state.items.splice(index, 1, item)
}

export function prepend(state, item) {
  setItem(state, item, true)
}

export function append(state, item) {
  setItem(state, item)
}

export function remove(state, id) {
  const index = state.items.findIndex((item) => Number(item.id) === Number(id))

  if (index > -1) {
    state.items.splice(index, 1)
  }

  if (state.detail && Number(state.detail.id) === Number(id)) {
    state.detail = null
  }
}

export function clear(state) {
  state.items = []
}

export function setMeta(state, meta) {
  state.meta = meta
}

export function setDetail(state, detail) {
  state.detail = detail
}
