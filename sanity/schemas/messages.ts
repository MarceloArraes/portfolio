import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'messages',
  type: 'document',
  title: 'MessageBoard',
  fields: [
    defineField({
      name: 'message',
      type: 'string',
      title: 'Message',
    }),
    defineField({
      name: 'active',
      type: 'boolean',
      title: 'Is active?',
    }),
  ],
})
