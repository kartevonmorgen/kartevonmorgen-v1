import React, { FC, useState } from 'react'
import { Select, SelectProps } from 'antd'
import { useDebounce } from 'ahooks'
import useTagMatcher from '../hooks/useTagMatcher'
import { MostPopularTagsParams } from '../pages/api/v0/entries/most-popular-tags'


const { Option } = Select


const TagsSelect: FC<SelectProps<any>> = (props) => {

  const {
    onSearch: onSearchHookFunction,
    onSelect: onSelectHookFunction,
    onDeselect: onDeselectHookFunction,
    onClear: onClearHookFunction,
  } = props

  const [tokenToMatchTagsWith, setTokenToMatchTagsWith] = useState<string>('')
  const debouncedTokenToMatchTagsWith = useDebounce(tokenToMatchTagsWith, { wait: 100 })

  const tagMatcherParams: MostPopularTagsParams = {
    contains: debouncedTokenToMatchTagsWith,
  }
  const { data: matchedTagsWithFrequency } = useTagMatcher(tagMatcherParams)


  return (
    <Select
      mode="tags"
      allowClear
      style={{ width: '100%' }}
      placeholder="Tags"
      onSearch={(input) => {
        setTokenToMatchTagsWith(input)
        onSearchHookFunction(input)
      }}
      onSelect={(value, option) => {
        setTokenToMatchTagsWith('')
        onSelectHookFunction(value, option)
      }}
      onDeselect={(value, option) => {
        setTokenToMatchTagsWith('')
        onDeselectHookFunction(value, option)
      }}
      onClear={() => {
        setTokenToMatchTagsWith('')
        onClearHookFunction()
      }}
    >
      {
        matchedTagsWithFrequency && (
          matchedTagsWithFrequency.map(tagWithFrequency => (
            <Option
              key={`tag-input-${tagWithFrequency.tag}`}
              value={tagWithFrequency.tag}
            >
              {tagWithFrequency.tag}
            </Option>
          ))
        )
      }
    </Select>
  )
}


TagsSelect.defaultProps = {
  onSearch: (_input) => {
  },
  onSelect: (_value, _option) => {
  },
  onDeselect: (_value, _option) => {
  },
  onClear: () => {
  },
}


export default TagsSelect