import React, { Dispatch, FC, useEffect, useState } from 'react'
import Category from '../dtos/Categories'
import EntityFormHeader from './EntryFormHeader'
import { Select } from 'antd'
import { SlugVerb } from '../utils/types'
import EntityForm from './EntityForm'
import { SearchEntryID } from '../dtos/SearchEntry'
import { EventID } from '../dtos/Event'


const changeCategory = (setCategory: Dispatch<Category>) => (category: Category) => {
  setCategory(category)
}


interface EntityChooserFormProps {
  category?: Category
  verb: SlugVerb.CREATE | SlugVerb.EDIT
  entityId?: SearchEntryID | EventID
}

const EntityChooserForm: FC<EntityChooserFormProps> = (props) => {

  const { verb, entityId } = props

  const [category, setCategory] = useState<Category>(null)
  const shouldCreateANewEntity = verb === SlugVerb.CREATE
  const shouldEditAnExistingEntity = verb === SlugVerb.EDIT

  useEffect(() => {
    setCategory(props.category)
  }, [props.category])

  return (
    <div style={{ paddingBottom: 60 }}>
      <EntityFormHeader
        isEdit={shouldEditAnExistingEntity}
      />

      {
        shouldCreateANewEntity && (
          <Select
            placeholder="Category"
            onSelect={changeCategory(setCategory)}
            style={{
              width: '100%',
              marginTop: 8,
              marginBottom: 16,
            }}
            value={category}
          >
            <Select.Option value={Category.INITIATIVE}>Initiative</Select.Option>
            <Select.Option value={Category.COMPANY}>Company</Select.Option>
            <Select.Option value={Category.EVENT}>Event</Select.Option>
          </Select>
        )
      }

      <EntityForm
        category={category}
        verb={verb}
        entityId={entityId}
      />

    </div>
  )
}

export default EntityChooserForm