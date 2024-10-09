import {defineArrayMember} from 'sanity'

export default {
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog article',
      // this add the generate slug from the title.
      options: {
        source: 'name',
      },
    },
    {
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'siteImage',
      type: 'image',
      title: 'Site Image',
    },
    {
      name: 'siteIcon',
      type: 'image',
      title: 'Site Icon',
    },
    {
      name: 'tecIcon1',
      type: 'image',
      title: 'Tech Icon 1',
    },
    {
      name: 'tecIcon2',
      type: 'image',
      title: 'Tech Icon 2',
    },
    {
      name: 'tecIcon3',
      type: 'image',
      title: 'Tech Icon 3',
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags for item',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'siteLink',
      type: 'url',
      title: 'Site Link',
    },
    {
      name: 'showcaseVideoFile',
      type: 'file',
      title: 'Showcase Video File',
      fields: [
        {
          name: 'asset',
          type: 'reference',
          to: [{type: 'sanity.fileAsset'}],
        },
      ],
    },
    {
      name: 'techDescription',
      type: 'text',
      title: 'Tech Description',
    },

    {
      title: 'Dark Image?',
      name: 'darkimage',
      type: 'boolean',
    },
    {
      name: 'active',
      title: 'Is active?',
      type: 'boolean',
    },
  ],
}
