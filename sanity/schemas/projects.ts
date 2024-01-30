export default {
    name: 'project',
    type: 'document',
    title: 'Project',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug of your blog article',
        // this add the generate slug from the title.
        options: {
          source:'name',
        }
      },
      {
        name: 'description',
        type: 'array',
        title: 'Description',
        of: [
          {
            type: 'block'
          }
        ]
      },
      {
        name: 'siteImage',
        type: 'image',
        title: 'Site Image'
      },
      {
        name: 'siteIcon',
        type: 'image',
        title: 'Site Icon'
      },
      {
        name: 'tecIcon1',
        type: 'image',
        title: 'Tech Icon1'
      },
      {
        name: 'tecIcon2',
        type: 'image',
        title: 'Tech Icon1'
      },
      {
        name: 'tecIcon3',
        type: 'image',
        title: 'Tech Icon1'
      },
      {
        name: 'techDescription',
        type: 'text',
        title: 'Tech Description'
      },
      {
        title: 'Dark Image?',
        name: 'darkimage',
        type: 'boolean'
      },
      {
        name: 'active',
        title: 'Is active?',
        type: 'boolean'
      }

    ]
  }
