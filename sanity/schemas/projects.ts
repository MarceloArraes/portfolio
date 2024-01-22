
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
        options: {
          source:'title',
        }
      },
      {
        name: 'titleImage',
        type: 'image',
        title: 'Title Image'
      },
      {
        name: 'smallDescription',
        type: 'text',
        title: 'Small Description'
      },
      {
        name: 'content',
        type: 'array',
        title: 'Content',
        of: [
          {
            type: 'block'
          }
        ]
      }
    ]
  }

  // edit