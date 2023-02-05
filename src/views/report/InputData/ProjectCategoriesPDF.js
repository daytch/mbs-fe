import React, { useState, useEffect } from 'react'
import { Page, View, Text, Document, StyleSheet } from '@react-pdf/renderer'
import PropTypes from 'prop-types'
import moment from 'moment'
import { styles, divider, Header } from './Styles'

const stylez = StyleSheet.create({
  subTitle: { fontFamily: 'Sans', fontSize: 14, fontWeight: 'bold', marginTop: 15 },
  content: { fontFamily: 'Sans', fontSize: 12, margin: '2 0 2 0' },
})

// Create Document Component
const ProjectCategoriesPDF = (props) => {
  const { projectcategories, project, projectRepresentation, showHeader, showFooter } = props
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    let ct = [...new Set(projectcategories.map((item) => item.projectCategoryName))]
    setCategories(ct)

    let subs = projectcategories.filter((item) => item.projectSubCategoryName !== '-')
    let sct = [...new Set(subs.map((item) => item.projectSubCategoryName))]
    setSubCategories(sct)
  }, [projectcategories])

  return (
    <Document>
      <Page style={styles.body}>
        <View style={styles.header}>
          <View style={styles.project}>
            <Text style={styles.labelProject}>Project:</Text>
            <Text style={styles.projectName}>{project.projectName}</Text>
          </View>
          <View style={styles.projRep}>
            <Text style={styles.labelProjRep}>Project Representation:</Text>
            <Text style={styles.projRepName}>
              {projectRepresentation.projectRepresentationName}
            </Text>
          </View>
        </View>

        {showHeader && Header('Project Categories')}

        <View style={{ marginTop: showHeader ? 10 : 35 }}>
          <View style={{ textAlign: 'left' }}>
            <Text style={stylez.subTitle}>Project Category</Text>
            {divider()}
            {categories.map((item, idx) => (
              <Text key={idx} style={stylez.content}>
                {item}
              </Text>
            ))}
          </View>
          <View>
            <Text style={stylez.subTitle}>Project Sub-category</Text>
            {divider()}
            {subCategories.map((item, idx) => (
              <Text key={idx} style={stylez.content}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {showFooter && (
          <>
            <Text style={styles.tanggal} render={() => moment().format('LLLL')} fixed />
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}
              fixed
            />
          </>
        )}
      </Page>
    </Document>
  )
}

ProjectCategoriesPDF.propTypes = {
  projectcategories: PropTypes.array,
  project: PropTypes.object,
  projectRepresentation: PropTypes.object,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool,
}

export default ProjectCategoriesPDF
